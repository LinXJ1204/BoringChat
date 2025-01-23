export interface ChatMessage {
    "type": "msg" | "others"
    "message": string
    "time": number
    "from": string
}