export type colors = {
  red: string
  yellow: string
}

export function useColor(): colors {
  return {
    red: '#FF3030',
    yellow: '#FFC125',
  }
}
