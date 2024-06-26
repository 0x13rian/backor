import Portal from "../components/graphics/portal";
import { usePrivy } from "@privy-io/react-auth";
import { PrivyClient } from "@privy-io/server-auth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Image } from "@chakra-ui/react"
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieAuthToken = req.cookies["privy-token"];
  // If no cookie is found, skip any further checks
  if (!cookieAuthToken) return { props: {} };

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
  const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

  try {
    const claims = await client.verifyAuthToken(cookieAuthToken);
    // Use this result to pass props to a page for server rendering or to drive redirects!
    // ref https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
    console.log({ claims });

    return {
      props: {},
      // redirect: { destination: "/fund", permanent: false },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default function LoginPage() {
  const { ready, authenticated, login, logout, } = usePrivy();

  useEffect(() => {
    (async () => {
      if (ready && authenticated) {
        await logout()
      }
    })
  }, [ready, authenticated]);

  return (
    <>
      <Head>
        <title>Dynasty</title>
      </Head>

      <main className="flex min-h-screen min-w-full">
        <div className="flex flex-1 p-6 justify-center items-center">
          <div>
            <div>
              <div className="flex items-center justify-center">
                <Image
                  className="h-8 w-8 flex "
                  src="/images/logo.png"
                  alt="avatar placeholder"
                  width="128px"
                  height="128px"
                />
              </div>
              <div className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                Dynasty
              </div>
            </div>

            <div className="mt-6 flex justify-center text-center">
              <button
                className="bg-green-600 hover:bg-green-700 py-3 px-6 text-white rounded-lg"
                onClick={login}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
