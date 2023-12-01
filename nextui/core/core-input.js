import { useCallback } from 'react';

const Form = ({ children, onSubmit = () => {}, ...passProps }) => {
	const onFormSubmit = useCallback((e) => {
		e.preventDefault();
		const form = e.target;
		const value = {};
		Array.from(form).map((el) => {
			el.name && el.type != 'submit' && (value[el.name] = el.value);
		});
		onSubmit(value);
	}, []);

	return (
		<form onSubmit={onFormSubmit} {...passProps}>
			{children}
		</form>
	);
};

export { Form };
