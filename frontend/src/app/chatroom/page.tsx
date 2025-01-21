"use client"
import { ChatMessage } from "@/type"
import { useEffect, useState } from "react"
import { socket } from "../socket";
import { chatTimeFormat } from "../utils";
import { useSearchParams } from "next/navigation";

export default function Chatroom() {
    const params = useSearchParams()
    const user = params.get('user')

    const [chat, setChat] = useState<ChatMessage[]>([])
    const [unsendMessage, setUnsendMessage] = useState<string>("")
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        if(!socket.connected) {
            socket.connect()
        }

        socket.on('chat message', (msg) => {
            setChat((prevChat) => [
                ...prevChat,
                {"from": msg.from, "message": msg.message, "time": msg.time}
            ])
        })
        setIsConnected(true)
        
        return () => {
            socket.off("chat message")
            socket.disconnect()
            setIsConnected(false)
        }
    }, [])

    return (
        <div
            className="w-full flex flex-col items-center py-12 xl:py-32"
        >
            <div
                className="w-[350px] xl:w-[1024px] h-[600px] p-[16px] bg-white"
            >
                <div
                    className="w-full h-full bg-black"
                >
                    <div
                        className="w-full h-[500px] p-4 overflow-scroll border border-1 border-black"
                    >
                        <div
                            className="w-full flex flex-col gap-4"
                        >
                            {
                                chat.map((c, index) => {
                                    return (
                                        <div
                                            key={`chat-message-${index}`}
                                            className={"w-full flex " + (c.from == user ? "justify-end" : "justify-start")}
                                        >
                                            {
                                                c.from == user ? 
                                                <div className="flex items-end">
                                                    <div className="text-sm text-white/40 mx-1">
                                                        <div>{chatTimeFormat(c.time)}</div>
                                                    </div>
                                                    <div
                                                        className="rounded text-black p-2 xl:text-xl bg-white" 
                                                    >
                                                        {c.message}
                                                    </div>
                                                </div>
                                                :
                                                <div className="flex items-end">
                                                    <div
                                                        className="rounded text-black p-2 xl:text-xl bg-white" 
                                                    >
                                                        {c.message}
                                                    </div>
                                                    <div className="text-sm text-white/40 mx-1">
                                                        <div>{chatTimeFormat(c.time)}</div>
                                                        <div>{`From ${c.from}`}</div>
                                                    </div>                                                
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                            {!isConnected && <div className="w-full text-center text-sm text-white/80">Chat is disconnected...</div>}
                        </div>
                    </div>
                    <div
                        className="w-full h-[68px] flex justify-between items-center bg-white px-4 py-2 border border-1 border-black"
                    >
                        <div className="xl:w-[700px]">
                            <input
                                className="w-full bg-black px-2 text-xl"
                                type="text"
                                value={unsendMessage}
                                onChange={(e) => {
                                    setUnsendMessage(e.target.value)
                                }}
                            />
                        </div>
                        <button 
                            className={"px-2 xl:px-8 py-2 border border-1 border-black " + (isConnected ? "text-black " : "text-black/30 ")}
                            onClick={() => {
                                if(unsendMessage != "") {
                                    socket.emit('chat message', {"from": user, "message": unsendMessage, "time": Date.now()})
                                    setUnsendMessage("")
                                }
                            }}
                            disabled={!isConnected}
                        >
                            {"Send"}
                        </button>
                        <button 
                            className="hidden xl:block px-8 py-2 text-black border border-1 border-black"
                            onClick={() => {
                                if(isConnected) {
                                    socket.off("chat message")
                                    socket.disconnect()
                                    setIsConnected(false)
                                } else {
                                    if(!socket.connected) socket.connect()
                                    socket.on("chat message", (msg) => {
                                        setChat((prevChat) => [
                                            ...prevChat,
                                            {"from": msg.from, "message": msg.message, "time": msg.time}
                                        ])
                                    })
                                    setIsConnected(true)
                                }
                            }}
                        >
                            {isConnected ? "Disconnect" : "Connect"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}