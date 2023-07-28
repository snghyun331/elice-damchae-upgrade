import { useCallback, useMemo, useState } from 'react';
import { mbtiList } from '../Util/Util';
import { getApi, putApi } from '../../services/api';
import Select from 'react-select';
import useUserStore, { useUserActions } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const InfoChange = () => {
	const navigate = useNavigate();
	const { logout, infoChange } = useUserActions();
	const {
		id,
		email,
		nickname,
		mbti,
		isGoogleLogin,
		profileImg,
		setNickname,
		setMbti,
		setProfileImg,
	} = useUserStore();

	console.log(nickname)
	
	const [passwordToChange, setPasswordToChange] = useState('');
	const [nicknameToChange, setNicknameToChange] = useState(nickname);
	const [mbtiToChange, setMbtiToChange] = useState(
		mbtiList.find((item) => item.value === mbti),
	);
	const [profileImgToChange, setProfileImgToChange] = useState(profileImg);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [nicknameCheck, setNicknameCheck] = useState(true);

	const isPasswordValid = useMemo(() => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		return passwordToChange ? passwordRegex.test(passwordToChange) : true;
	}, [passwordToChange]);

	const isNicknameValid = useMemo(() => {
		const nicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,16}$/;
		return nicknameRegex.test(nicknameToChange);
	}, [nicknameToChange]);
	const isPasswordSame = useMemo(
		() => passwordToChange == confirmPassword,

		[passwordToChange, confirmPassword],
	);

	const isFormValid = useMemo(
		() =>
			isPasswordValid &&
			isPasswordSame &&
			isNicknameValid &&
			nicknameCheck &&
			Boolean(mbti),
		[isPasswordValid, isPasswordSame, isNicknameValid, nicknameCheck, mbti],
	);

	const handleChangeInput = useCallback(({ target }) => {
		const { name, value, files } = target;

		switch (name) {
			case 'password':
				setPasswordToChange(value);
				break;
			case 'nickname':
				setNicknameToChange(value);
				setNicknameCheck(false);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			case 'profileImg': {
				const file = files[0];
				setProfileImgToChange(URL.createObjectURL(file));
				break;
			}
		}
	}, []);

	const handleNicknameCheck = useCallback(async () => {
		try {
			const response = await getApi(
				`auth/checkNickname?nickname=${nicknameToChange}`,
			);

			if (response.data.nicknameState == 'usableNickname') {
				alert(response.data.usableNickname);
				setNicknameCheck(true);
			}
			if (response.data.nicknameState == 'unusableNickname') {
				alert(response.data.unusableNickname);
				setNicknameCheck(false);
			}
		} catch (error) {
			console.log(error.response.data.message);
		}
	}, [nicknameToChange]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			// passwordToChange가 빈 문자열이라면 password는 toUpdate에 추가하지 않습니다.
			const toUpdate = {
				email,
				...(passwordToChange !== '' && { password: passwordToChange }),
				nickname: nicknameToChange,
				mbti: mbtiToChange.value,
			};

			try {
				console.log(toUpdate);
				const res = await putApi(`users/${id}`, toUpdate);
				if (res.status === 200) {
					alert('정보를 수정하였습니다.');
					setNickname(toUpdate.nickname);
					setMbti(toUpdate.mbti);
					setProfileImg(toUpdate.profileImg);
					infoChange(toUpdate);
				} else {
					alert('정보 수정에 실패하였습니다.');
				}
			} catch (err) {
				console.log(err);
			}
		},
		[email, id, mbtiToChange, nicknameToChange, passwordToChange],
	);

	const handleOut = async () => {
		const confirmResign = window.confirm('정말로 회원 탈퇴를 하시겠습니까?');
		if (confirmResign) {
			try {
				const response = await putApi(`auth/out`, { userId: id });
				if (response.status === 200) {
					alert('정상적으로 회원탈퇴가 완료되었습니다.');
					logout();
					navigate('/');
				}
			} catch (error) {
				console.error('회원탈퇴 오류:', error);
			}
		}
	};

	return (
		<>
			<section className="" style={{}}>
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 my-20">
					<div className="w-full bg-white rounded-sm shadow-xl dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								회원정보 수정
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
								<div>
									<label
										className="block mb-2 font-semibold text-gray-900 dark:text-white"
										htmlFor="file_input"
									>
										프로필 이미지
									</label>
									<input
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										id="file_input"
										name="profileImg"
										type="file"
										onChange={handleChangeInput}
									/>

									<div className="mt-4">
										{profileImgToChange ? (
											<>
												<p className="text-sm text-gray-500">선택된 이미지:</p>
												<img
													className="mt-2 max-w-xs"
													src={profileImgToChange}
													alt="Selected Thumbnail"
												/>
											</>
										) : (
											''
										)}
									</div>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="email"
										className="block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										이메일
									</label>
									<div className="flex space-x-2">
										<div>{email}</div>
										<div />
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
										className="mt-3 block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										비밀번호
									</label>
									<input
										disabled={isGoogleLogin}
										value={passwordToChange}
										onChange={handleChangeInput}
										autoComplete=""
										type="password"
										name="password"
										id="password"
										placeholder={
											isGoogleLogin
												? '구글로 가입한 경우 비밀번호 수정이 불가합니다.'
												: ''
										}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
									<p
										className={`text-xs ${
											!isPasswordValid && passwordToChange
												? 'text-red-500'
												: 'text-transparent'
										}`}
									>
										{!isPasswordValid && passwordToChange
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
										disabled={isGoogleLogin}
										value={confirmPassword}
										onChange={handleChangeInput}
										autoComplete=""
										type="password"
										name="confirmPassword"
										id="confirm-password"
										placeholder={
											isGoogleLogin
												? '구글로 가입한 경우 비밀번호 수정이 불가합니다.'
												: ''
										}
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
										className="block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										닉네임
									</label>

									<div className="flex flex-row space-x-2 justify-end">
										<input
											onChange={handleChangeInput}
											value={nicknameToChange}
											type="text"
											name="nickname"
											id="nickname"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>

										<button
											type="button"
											onClick={handleNicknameCheck}
											disabled={
												!isNicknameValid || nickname == nicknameToChange
											}
											className="flex items-center justify-center self-end bg-blue-500 text-white font-bold py-2 px-4 h-full rounded-sm focus:outline-none focus:shadow-outline disabled:bg-blue-200 hover:bg-blue-600 w-1/3 text-sm"
											style={{ height: '45px' }}
										>
											중복 확인
										</button>
									</div>

									<p
										className={`text-xs ${
											!isNicknameValid && nicknameToChange
												? 'text-red-500'
												: 'text-transparent'
										}`}
									>
										{!isNicknameValid && nicknameToChange
											? '닉네임은 2~16자 사이로 설정해주세요.'
											: ''}{' '}
										<span
											className={`text-xs ${
												isNicknameValid && !nicknameCheck
													? 'text-red-500'
													: 'text-transparent'
											}`}
										>
											{isNicknameValid && !nicknameCheck
												? '중복 확인버튼을 눌러 주세요.'
												: '　'}
										</span>
									</p>
								</div>
								<div>
									<label
										htmlFor="mbti"
										className="block mb-2 font-semibold text-gray-900 dark:text-white"
									>
										MBTI
									</label>
									<Select
										defaultValue={mbtiToChange}
										onChange={setMbtiToChange}
										options={mbtiList}
										placeholder="MBTI "
										classNamePrefix="react-select"
									/>
								</div>
								<div className="flex flex-col">
									<button
										disabled={!isFormValid}
										className="my-4 w-full flex items-center justify-center self-end bg-blue-500 text-white font-bold py-2 px-4 h-full rounded-sm focus:outline-none focus:shadow-outline disabled:bg-blue-200 hover:bg-blue-600 w-1/3 text-sm"
										onClick={handleSubmit}
									>
										수정하기
									</button>
									<hr className="my-8" />
									<button
										onClick={handleOut}
										className="text-sm text-red-600 underline ml-auto"
									>
										회원 탈퇴
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default InfoChange;
