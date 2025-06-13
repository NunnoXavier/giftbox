import { useState } from "react"

export const Timer = (callback?: (time?:number) => void) => {
    const [time, setTime] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)
    const [isRunning, setIsRunning] = useState(false)

    const handleCallback = (updatedTime: number) => {
        callback?.(updatedTime)
    }

    const start = () => {
        setTime(0)
        const id = setInterval(() => {
            setTime((prev) => {
                const newTime = prev + 1
                handleCallback(newTime)
                return newTime
            })
            setIsRunning(true)            
        }, 1000)
        setIntervalId(id)
    }

    const stop = () => {
        if(intervalId) {
            setIntervalId(null)
            setIsRunning(false)
        }
    }

    const reset = () => {
        setTime(0)
        setIsRunning(false)
    }

    return {
        time,
        start,
        stop,
        reset,
        isRunning
    }
}

export default Timer