/** @format */

// this file allow us to add general structure of the page

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' suppressHydrationWarning>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='anonymous'
					/>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Poppins:wght@400;500;600;700&display=swap'
					/>
				</Head>
				<body suppressHydrationWarning>
					{/* Shown until _app hydrates — avoids unstyled flash; removed in AppShell */}
					<div
						id='app-boot-splash'
						className='app-boot-splash'
						aria-busy='true'
						aria-label='Loading'>
						<div className='app-boot-splash__spinner' aria-hidden='true' />
					</div>
					<Main />
					<NextScript />
					{/* // for add Portal */}
					<div id='backdrop--root'></div>
					<div id='modal--overlay--root'></div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
