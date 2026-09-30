export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { script, language, versionIndex } = req.body;

    // We will securely inject your keys through the Vercel dashboard later
    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;

    try {
        const response = await fetch("https://api.jdoodle.com/v1/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: clientId,
                clientSecret: clientSecret,
                script: script,
                language: language,
                versionIndex: versionIndex
            })
        });

        const data = await response.json();
        
        // Send the JDoodle response back to your frontend
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to JDoodle server' });
    }
}