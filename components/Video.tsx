type VideoProps = {
    videoUrl: string;
  };
  
  function getYouTubeEmbedUrl(url: string): string {
    // Handles both https://www.youtube.com/watch?v=ID and https://youtu.be/ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    const id = watchMatch?.[1] ?? shortMatch?.[1] ?? "";
    return `https://www.youtube.com/embed/${id}`;
  }
  
  export default function Video({ videoUrl }: VideoProps) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);

    
  // pt-[56.25%] trick maintains a 16:9 aspect ratio on all screen sizes
    return (
      <div className="relative w-full overflow-hidden rounded-xl pt-[56.25%] shadow-md">
        <iframe
          src={embedUrl}
          title="Embedded YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }