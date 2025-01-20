import Head from 'next/head';
import styles from '../styles/Tryon.module.css'; // Optional, for custom styling

const TryOn = () => {
  return (
    <>
      <Head>
        <title>Virtual Try-On</title>
        <meta name="description" content="Try on virtual clothing with Kolors" />
      </Head>

      <div className={styles.container}>
        <h1>Try On Virtual Clothing</h1>
        
        {/* Embed Kolors Virtual Try-On Space */}
        <iframe
          src="https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On"
          width="100%"
          height="800px" // Adjust this to fit your layout
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default TryOn;
