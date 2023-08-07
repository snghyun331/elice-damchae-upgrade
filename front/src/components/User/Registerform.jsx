import useRegisterStore from '../../hooks/useRegisterStore';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { mbtiList } from '../Util/Util';

import { getApi, postApi } from '../../services/api';
import { useUserActions } from '../../store/useUserStore';
import ProfilePicker from './ProfilePicker';
import toast from 'react-hot-toast';

const RegisterForm = () => {
	const navigate = useNavigate();

	const {
		email,
		password,
		nickname,
		mbti,
		confirmPassword,
		code,
		errMsg,
		nicknameCheck,
		profileImg,

		setEmail,
		setPassword,
		setNickname,
		setMbti,
		setConfirmPassword,
		setCode,
		setNicknameCheck,
		setErrMsg,
	} = useRegisterStore();

	const { register } = useUserActions();

	const handleChangeInput = useCallback((e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'email':
				setEmail(value);
				setIsCodeConfirmed(false);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'nickname':
				setNickname(value);
				setNicknameCheck(false);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			case 'code':
				setCode(value);
				break;
		}
	}, []);

	const validateEmail = () => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,255}$/;
		return emailRegex.test(email);
	};

	const validatePassword = () => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		return passwordRegex.test(password);
	};

	const validateNickname = () => {
		const nicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,16}$/;
		return nicknameRegex.test(nickname);
	};

	const isEmailValid = useMemo(validateEmail, [email]);
	const isPasswordValid = useMemo(validatePassword, [password]);
	const isNicknameValid = useMemo(validateNickname, [nickname]);
	const isPasswordSame = useMemo(
		() => password === confirmPassword,
		[password, confirmPassword],
	);
	const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
	const [emailButtonDisabled, setEmailButtonDisabled] = useState(false);

	const isFormValid = useMemo(
		() =>
			isEmailValid &&
			isPasswordValid &&
			isPasswordSame &&
			isNicknameValid &&
			nicknameCheck &&
			Boolean(mbti) &&
			isCodeConfirmed,
		[
			isEmailValid,
			isPasswordValid,
			isPasswordSame,
			isNicknameValid,
			nicknameCheck,
			mbti,
			code,
		],
	);

	const user = { email, password, nickname, mbti, profileImg };
	console.log(mbti);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(user);
			await register(user);
			navigate('/login');
		} catch (error) {
			setErrMsg(error.response?.data?.errorMessage);
		}
	};

	const handleEmailSend = async () => {
		try {
			setEmailButtonDisabled(true);
			const response = await postApi('auth/sendEmailCode', { email: email });
			if (response.status === 200) {
				toast.success('이메일로 인증코드가 발송 되었습니다.');
			}
			setEmailButtonDisabled(false);
		} catch (error) {
			setEmailButtonDisabled(false);
			toast.error(error.response.data.errorMessage);
		}
	};

	const handleCodeCheck = async () => {
		try {
			const response = await postApi('auth/checkEmailCode', { string: code });
			console.log(response);
			if (response.status === 200) {
				setIsCodeConfirmed(true);
				toast.success('이메일 인증이 완료되었습니다.');
			}
		} catch (error) {
			toast.error(error.response.data.errorMessage);
		}
	};

	const handleNicknameCheck = async () => {
		try {
			const response = await getApi(`auth/checkNickname?nickname=${nickname}`);
			console.log(response.data);

			if (response.data.nicknameState == 'usableNickname') {
				toast.success(response.data.usableNickname);
				setNicknameCheck(true);
			}
			if (response.data.nicknameState == 'unusableNickname') {
				toast.error(response.data.unusableNickname);
				setNicknameCheck(false);
			}
		} catch (error) {
			console.log(error.response.data.message);
		}
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="overflow-y-auto w-full bg-white rounded-sm shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								회원가입
							</h1>
							<ProfilePicker />
							<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
								<div className="flex flex-col">
									<label
										htmlFor="email"
										className="block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										이메일
									</label>
									<div className="flex space-x-2 justify-end">
										<input
											value={email}
											onChange={handleChangeInput}
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											required=""
										/>
										<button
											type="button"
											onClick={handleEmailSend}
											disabled={
												!email ||
												!isEmailValid ||
												isCodeConfirmed ||
												emailButtonDisabled
											}
											className="flex items-center justify-center self-end bg-blue-500 text-white font-bold py-2 px-4 h-full rounded-sm focus:outline-none focus:shadow-outline disabled:bg-blue-200 hover:bg-blue-600 w-1/3 text-sm"
											style={{ height: '45px' }}
										>
											인증코드 발송
										</button>
									</div>
									<p
										className={`mb-3 text-xs ${
											!isEmailValid && email
												? 'text-red-500'
												: 'text-transparent'
										}`}
									>
										{!isEmailValid && email
											? '이메일 형식이 올바르지 않습니다.'
											: '　'}
									</p>
								</div>
								<div className="flex flex-col">
									<div className="flex flex-row space-x-2 justify-end">
										<input
											value={code}
											onChange={handleChangeInput}
											type="text"
											name="code"
											id="verification-code"
											placeholder="인증번호 입력"
											className="-mt-5 h-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required=""
										/>

										<button
											type="button"
											onClick={handleCodeCheck}
											disabled={!code || isCodeConfirmed}
											className="-mt-5 flex items-center justify-center self-end bg-blue-500 text-white font-bold py-2 px-4 h-full rounded-sm focus:outline-none focus:shadow-outline disabled:bg-blue-200 hover:bg-blue-600 w-1/3 text-sm"
											style={{ height: '45px' }}
										>
											확인
										</button>
									</div>
									<div>
										<span
											className={`mb-3 text-xs ${
												isCodeConfirmed ? 'text-green-500' : ''
											}`}
										>
											{isCodeConfirmed ? '이메일 인증이 완료되었습니다.' : ''}
										</span>{' '}
										<span className="text-xs text-red-500">
											{isEmailValid && !isCodeConfirmed
												? '이메일 인증을 진행해주세요.'
												: ''}
										</span>
									</div>
								</div>
								<div>
									<label
										htmlFor="password"
										className="mt-8 block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										비밀번호
									</label>
									<input
										value={password}
										onChange={handleChangeInput}
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
									<p
										className={`text-xs ${
											!isPasswordValid && password
												? 'text-red-500'
												: 'text-transparent'
										}`}
									>
										{!isPasswordValid && password
											? '비밀번호는 8~20자 영문, 숫자, 특수문자 조합으로 설정해주세요.'
											: '　'}
									</p>
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										비밀번호 재확인
									</label>
									<input
										value={confirmPassword}
										onChange={handleChangeInput}
										type="password"
										name="confirmPassword"
										id="confirm-password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>

									<p
										className={`text-xs ${
											!isPasswordSame && confirmPassword
												? 'text-red-500'
												: 'text-transparent'
										}`}
									>
										{!isPasswordSame && confirmPassword
											? '비밀번호가 일치하지 않습니다.'
											: '　'}
									</p>
								</div>

								<div className="flex flex-col">
									<label
										htmlFor="nickname"
										className="-mt-3 block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										닉네임
									</label>

									<div className="flex flex-row space-x-2 justify-end">
										<input
											value={nickname}
											onChange={handleChangeInput}
											type="text"
											name="nickname"
											id="nickname"
											placeholder="강아지"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>

										<button
											type="button"
											onClick={handleNicknameCheck}
											disabled={!isNicknameValid}
											className="flex items-center justify-center self-end bg-blue-500 text-white font-bold py-2 px-4 h-full rounded-sm focus:outline-none focus:shadow-outline disabled:bg-blue-200 hover:bg-blue-600 w-1/3 text-sm"
											style={{ height: '45px' }}
										>
											중복 확인
										</button>
									</div>

									<p
										className={`text-xs ${
											!isNicknameValid && nickname
												? 'text-red-500'
												: 'text-transparent'
										}`}
									>
										{!isNicknameValid && nickname
											? '닉네임은 2~16자 사이로 설정해주세요.'
											: '　'}
									</p>
								</div>

								<div>
									<label
										htmlFor="mbti"
										className="-mt-3 block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										MBTI
									</label>
									<Select
										onChange={(selectedOption) => setMbti(selectedOption.value)}
										options={mbtiList}
										placeholder="MBTI 선택"
										classNamePrefix="react-select"
									/>
								</div>
								<div className="flex flex-col">
									<button
										type="submit"
										disabled={!isFormValid}
										className="my-4 w-full flex items-center justify-center self-end bg-blue-500 text-white font-bold py-2 px-4 h-full rounded-sm focus:outline-none focus:shadow-outline disabled:bg-blue-200 hover:bg-blue-600 w-1/3 text-sm"
										style={{ height: '45px' }}
									>
										가입하기
									</button>
									{errMsg && <p className="text--500 text-xs">{errMsg}</p>}

									<p className="mt-3 self-center text-sm font-light text-gray-500 dark:text-gray-400">
										이미 계정이 있습니까?{' '}
										<a
											onClick={() => navigate('/login')}
											className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-"
										>
											로그인하기
										</a>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default RegisterForm;
