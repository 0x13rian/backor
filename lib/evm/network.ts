export const teams = [
    "Arsenal",
    "Man City", "Liverpool", "Aston Villa", "Newcastle",
    "Tottenham", "Man United", "Chelsea", "West Ham", "Brighton",
    //"Brentford", "Crystal Palace", "Fulham", "Everton", "Bournemouth",
    //"Wolves", "Forest", "Burnley", "Luton", "Sheffield United"
]

export const getTeamLogo = (team: string) => {
    switch (team) {
        case "Arsenal":
            return "https://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png"
        case "Man City":
            return "https://t2.gstatic.com/images?q=tbn:ANd9GcR8lzo29IshF2Zvap5wwO5zi8xdm3w2aRkMITE0mcfneNeSrmQ6"
        case "Liverpool":
            return "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/270px-Liverpool_FC.svg.png"
        case "Aston Villa":
            return "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Aston_Villa_logo.svg/1200px-Aston_Villa_logo.svg.png"
        case "Newcastle":
            return "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/1200px-Newcastle_United_Logo.svg.png"
        case "Tottenham":
            return "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png"
        case "Man United":
            return "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/640px-Manchester_United_FC_crest.svg.png"
        case "Chelsea":
            return "https://img.chelseafc.com/image/upload/h_120/v1/logos/cfc-main-800x800.png"
        case "West Ham":
            return "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/263px-West_Ham_United_FC_logo.svg.png"
        case "Brighton":
            return "https://upload.wikimedia.org/wikipedia/en/d/d0/Brighton_and_Hove_Albion_FC_crest.svg"
        default:
            return ""
    }
}