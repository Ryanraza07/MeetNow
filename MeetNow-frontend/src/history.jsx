import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext) // Fixed spelling here
    const [meetings, setMeetings] = useState([])
    const [error, setError] = useState(null)
    const routeTo = useNavigate()

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser() // Fixed spelling here
                setMeetings(history)
                setError(null)
            } catch (error) {
                console.error('Failed to fetch history:', error)
                setError(error.message)
            }
        }
        fetchHistory()
    }, [getHistoryOfUser]) // Fixed spelling here

    return (
        <Box sx={{ padding: 2 }}>
            <IconButton 
                onClick={() => routeTo("/home")}
                sx={{ marginBottom: 2 }}
            >
                <HomeIcon />
            </IconButton>

            {error && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}

            {meetings.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    No meetings found in history
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {meetings.map((meeting) => (
                        <Card 
                            key={meeting._id || meeting.meetingCode} 
                            variant="outlined"
                        >
                            <CardContent>
                                <Typography 
                                    sx={{ fontSize: 14 }} 
                                    color="text.secondary" 
                                    gutterBottom
                                >
                                    Code: {meeting.meetingCode}
                                </Typography>
                                <Typography 
                                    sx={{ mb: 1.5 }} 
                                    color="text.secondary"
                                >
                                    Date: {formatDate(meeting.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    )
}