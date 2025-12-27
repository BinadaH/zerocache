
const GameState = {
  Init: true,
  FirstMailsRead: false,
  GuideDownloaded: false, 
  AnalyzeFakeDomainOnDNSight: false,
  VisitDennsLife: false,
  SQLInjection: false,
  LoginDennsAccount: false,
  DownloadZip: false,
  LoginRebbsAccount: false,
  ViewConvo: false,
  ConnectToCams: false
}


type FortmailUser = {
  email: string,
  password: string,
}

const GameInfo = {
  fortmailLoggedInUsers : [] as FortmailUser[]
}

type GameStep = keyof typeof GameState

export function setGameStep(step: GameStep, value: boolean) {
  GameState[step] = value
}

export function getGameStep(step: GameStep) : boolean {
  return GameState[step]
}
