import { useCallback } from 'react';

const Form = ({ children, onSubmit = () => {} }) => {
	const onFormSubmit = useCallback(async (e) => {
		e.preventDefault();
		const form = e.target;
		const value = {};
		Array.from(form).map((el) => {
			el.name && el.type != 'submit' && (value[el.name] = el.value);
		});
		onSubmit(value);
	}, []);

	return <form onSubmit={onFormSubmit}>{children}</form>;
};

export { Form };
