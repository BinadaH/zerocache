
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


type GameStep = keyof typeof GameState

export function setGameStep(step: GameStep, value: boolean) {
  GameState[step] = value
}

export function getGameStep(step: GameStep) : boolean {
  return GameState[step]
}
