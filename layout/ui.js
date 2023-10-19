'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import GrommetRoot from './grommet';

const STORAGE_KEY = 'UI-SETTINGS';

const UiContext = createContext();

function useUi() {
	return useContext(UiContext);
}

function useThemeMode() {
	return useUi().themeMode;
}

function useChangeThemeMode() {
	return useUi().changeThemeMode;
}

function parseUnsafeJson(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return null;
	}
}

function makeDefaultUi() {
	return { themeMode: 'light' };
}

function readStorage() {
	return parseUnsafeJson(localStorage.getItem(STORAGE_KEY));
}

function setStorage(ui) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(ui));
}

function UiPack({ children }) {
	const [ui, setUi] = useState(makeDefaultUi);

	useEffect(() => {
		setUi(Object.assign(makeDefaultUi(), readStorage()));
	}, []);

	const changeThemeMode = useCallback(
		(newOne) => {
			const newUi = { ...ui, themeMode: newOne };
			setUi(newUi);
			setStorage(newUi);
		},
		[ui]
	);

	const context = useMemo(() => ({ ...ui, changeThemeMode }), [ui, changeThemeMode]);

	return (
		<UiContext.Provider value={context}>
			<CustomGrommetRoot>{children}</CustomGrommetRoot>
		</UiContext.Provider>
	);
}

function CustomGrommetRoot({ children }) {
	const themeMode = useThemeMode();

	return <GrommetRoot {...{ themeMode }}>{children}</GrommetRoot>;
}

export { UiPack, useThemeMode, useChangeThemeMode };
