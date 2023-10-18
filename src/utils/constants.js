const YT_API_KEY = "AIzaSyBEkFG-Bt4W3KzysAjv3bFvn9tpxt1MQd4";

export const YT_VIDEOS_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${YT_API_KEY}`;

export const YT_SEARCH_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`;