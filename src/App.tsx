import React, { FC } from 'react';

import { Container, CssBaseline, GlobalStyles } from '@mui/material';
import { grey } from '@mui/material/colors';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { UsersListPage } from 'pages/UsersListPage';

const App: FC = () => {
	return (
		<>
			<CssBaseline />
			<GlobalStyles
				styles={{
					body: { backgroundColor: grey[100] },
				}}
			/>

			{/* In future this would become an app shell */}
			<Container component="main" sx={{ maxWidth: 'md' }}>
				{/* This would likely contain routing to additional pages */}
				<UsersListPage />
			</Container>
		</>
	);
};

export default App;
