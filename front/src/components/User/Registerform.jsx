import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const RegisterForm = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		email: '',
		password: '',
		nickname: '',
		mbti: '',
	});

	const [confirmPassword, setConfirmPassword] = useState('');
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [isConfirmFocused, setIsConfirmFocused] = useState(false);
	const [verificationCode, setVerificationCode] = useState('');
	const [isVerificationCodeFocused, setIsVerificationCodeFocused] =
		useState(false);

	const handleChangeInput = useCallback(
		(e) => {
			setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		},
		[setUser],
	);

	const handleChangeConfirm = useCallback(
		(e) => {
			setConfirmPassword(e.target.value);
		},
		[setConfirmPassword],
	);

	const handleChangeVerificationCode = useCallback(
		(e) => {
			setVerificationCode(e.target.value);
		},
		[setVerificationCode],
	);

	const validateEmail = useCallback(() => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,255}$/;
		return emailRegex.test(user.email);
	}, [user.email]);

	const validatePassword = useCallback(() => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		return passwordRegex.test(user.password);
	}, [user.password]);

	const isEmailValid = useMemo(validateEmail, [validateEmail]);
	const isPasswordValid = useMemo(validatePassword, [validatePassword]);
	const isPasswordSame = useMemo(
		() => user.password === confirmPassword,
		[user.password, confirmPassword],
	);

	const isFormValid = useMemo(
		() => isEmailValid && isPasswordValid && isPasswordSame,
		[isEmailValid, isPasswordValid, isPasswordSame],
	);

	const handleEmailVerification = () => {
		// Logic for email verification
		// You can implement your own email verification functionality here
	};

	const handleVerificationCodeVerification = () => {
		// Logic for verification code verification
		// You can implement your own verification code verification functionality here
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								회원가입
							</h1>
							<form className="space-y-4 md:space-y-6" action="#">
								<div className="flex flex-col">
									<div className="flex flex-row space-x-2 justify-end">
										<input
											value={user.email}
											onChange={handleChangeInput}
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											required=""
											onFocus={() => setIsEmailFocused(true)}
											onBlur={() => setIsEmailFocused(false)}
										/>

										<button
											type="button"
											onClick={handleEmailVerification}
											disabled={!user.email || isEmailFocused}
											className="self-end bg-[#85B7CC] text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0] w-1/3 text-sm"
										>
											이메일인증
										</button>
									</div>
									{!isEmailValid && isEmailFocused && (
										<p className="text-red-500 text-xs italic">
											이메일 형식이 올바르지 않습니다.
										</p>
									)}
								</div>

								<div className="flex flex-row space-x-2">
									<input
										value={verificationCode}
										onChange={handleChangeVerificationCode}
										type="text"
										name="verificationCode"
										id="verification-code"
										placeholder="인증번호 입력"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => setIsVerificationCodeFocused(true)}
										onBlur={() => setIsVerificationCodeFocused(false)}
									/>
									<button
										type="button"
										onClick={handleVerificationCodeVerification}
										disabled={!verificationCode || isVerificationCodeFocused}
										className="justify-self-end bg-[#85B7CC] text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0] w-1/3 text-sm"
									>
										확인
									</button>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										비밀번호
									</label>
									<input
										value={user.password}
										onChange={handleChangeInput}
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => setIsPasswordFocused(true)}
										onBlur={() => setIsPasswordFocused(false)}
									/>
									{!isPasswordValid && isPasswordFocused && (
										<p className="text-red-500 text-xs italic">
											비밀번호는 8~20자 이상 영문, 숫자, 특수문자 조합으로
											설정해 주세요.
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										비밀번호 재확인
									</label>
									<input
										value={confirmPassword}
										onChange={handleChangeConfirm}
										type="password"
										name="confirmPassword"
										id="confirm-password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => setIsConfirmFocused(true)}
										onBlur={() => setIsConfirmFocused(false)}
									/>
									{!isPasswordSame && isConfirmFocused && (
										<p className="text-red-500 text-xs italic">
											비밀번호가 일치하지 않습니다.
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="nickname"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										닉네임
									</label>
									<input
										value={user.nickname}
										onChange={handleChangeInput}
										type="text"
										name="nickname"
										id="nickname"
										placeholder="강아지"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="mbti"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										MBTI
									</label>
									<Select
										value={user.mbti}
										onChange={(selectedOption) =>
											setUser((prev) => ({ ...prev, mbti: selectedOption }))
										}
										options={[
											{ value: 'ISTJ', label: 'ISTJ' },
											{ value: 'ISFJ', label: 'ISFJ' },
											{ value: 'INFJ', label: 'INFJ' },
											{ value: 'INTJ', label: 'INTJ' },
											{ value: 'ISTP', label: 'ISTP' },
											{ value: 'ISFP', label: 'ISFP' },
											{ value: 'INFP', label: 'INFP' },
											{ value: 'INTP', label: 'INTP' },
											{ value: 'ESTP', label: 'ESTP' },
											{ value: 'ESFP', label: 'ESFP' },
											{ value: 'ENFP', label: 'ENFP' },
											{ value: 'ENTP', label: 'ENTP' },
											{ value: 'ESTJ', label: 'ESTJ' },
											{ value: 'ESFJ', label: 'ESFJ' },
											{ value: 'ENFJ', label: 'ENFJ' },
											{ value: 'ENTJ', label: 'ENTJ' },
										]}
										placeholder="Select MBTI"
										classNamePrefix="react-select"
									/>
								</div>
								<div className="flex flex-col">
									<button
										type="submit"
										disabled={!isFormValid}
										className="self-end bg-[#85B7CC] text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0]"
									>
										가입하기
									</button>
									<p className="mt-3 self-center text-sm font-light text-gray-500 dark:text-gray-400">
										이미 계정이 있습니까?{' '}
										<a
											onClick={() => navigate('/login')}
											href="#"
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
