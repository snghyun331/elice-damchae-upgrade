import { useState } from 'react';
import useUserStore from '../store/useUserStore';

const useRegisterStore = () => {
	const {
		email,
		password,
		nickname,
		mbti,
		isLoggedIn,
		errMsg,

		setEmail,
		setPassword,
		setNickname,
		setMbti,
		setIsLoggedIn,
		setErrMsg,
	} = useUserStore();

	const [confirmPassword, setConfirmPassword] = useState('');
	const [code, setCode] = useState('');
	const [checkMsg, setCheckMsg] = useState('');
	const [nicknameCheck, setNicknameCheck] = useState(false);

	return {
		email,
		password,
		nickname,
		mbti,
		isLoggedIn,
		confirmPassword,
		code,
		errMsg,
		checkMsg,
		nicknameCheck,

		setEmail,
		setPassword,
		setNickname,
		setMbti,
		setIsLoggedIn,
		setConfirmPassword,
		setCode,
		setErrMsg,
		setCheckMsg,
		setNicknameCheck,
	};
};

export default useRegisterStore;
