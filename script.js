
document.addEventListener('DOMContentLoaded', () => {
    const memeImg = document.getElementById('meme-img');
    const generateBtn = document.getElementById('generate');
    const downloadBtn = document.getElementById('download');

    // Function to fetch a random meme
    const fetchMeme = async () => {
        try {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            const memes = data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            memeImg.src = randomMeme.url;
        } catch (error) {
            console.error('Error fetching meme:', error);
        }
    };

    // Function to handle click on Generate Meme button
    generateBtn.addEventListener('click', fetchMeme);

    // Function to handle click on Download button
    downloadBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous"; // This is important to avoid CORS issues
        img.src = memeImg.src;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'meme.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/jpeg');
        };
    });
});