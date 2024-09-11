
class InstagramProfile {
    constructor(userId, accessToken) {
        this._userId = userId;
        this._accessToken = accessToken;
        this._media = [];
    }

    async fetchMedia() {
        const response = await fetch(`https://graph.instagram.com/${this._userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${this._accessToken}`);
        const data = await response.json();
        this._media = data.data;
    }

    get media() {
        return this._media;
    }

    set media(newMedia) {
        this._media = newMedia;
    }
}

const profile = new InstagramProfile('YOUR_INSTAGRAM_USER_ID', 'YOUR_ACCESS_TOKEN');
profile.fetchMedia().then(() => {
    console.log(profile.media);  
});

const accessToken = 'YIGQWRNeS1ENFE1UG1vdU9sYURaRnJQMWNaakR4N3NWdGtGZAXAzMWhVX3dmSFpheVh0cWpIXzNPVkFfVzJSVGpxOUFkYnNhd0pCckNRZAGRoZAEFtSGNDMU5GZAlA0ZA1JkZAWJjeHd3eC05aXNaSnhxV1lsTWRkVmliS3cZD'; 

async function fetchInstagramMedia() {
    try {
        const response = await fetch(`https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            throw new Error('No media found or an error occurred');
        }

        const feedContainer = document.getElementById('instagram-feed');
        data.data.forEach(media => {
            let mediaElement = '';
            if (media.media_type === 'IMAGE') {
                mediaElement = `<img src="${media.media_url}" alt="${media.caption}">`;
            } else if (media.media_type === 'VIDEO') {
                mediaElement = `<video controls>
                                    <source src="${media.media_url}" type="video/mp4">
                                  </video>`;
            }

            feedContainer.innerHTML += `
                <div class="post">
                    ${mediaElement}
                    <p>${media.caption || 'No caption'}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        document.getElementById('instagram-feed').innerHTML = '<p>Error fetching Instagram feed. Please try again later.</p>';
    }
}


document.addEventListener('DOMContentLoaded', fetchInstagramMedia);