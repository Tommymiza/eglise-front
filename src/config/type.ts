export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export type HeaderColumn = {
    id: string
    label: string
    isAscendant?: boolean
}
  