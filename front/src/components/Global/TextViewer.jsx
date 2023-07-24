// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export default function TextViewer() {
	// 마크다운

	// HTML: span태그 글자색을 파란색으로 설정
	const html =
		'<p>이것은 본문 내용입니다. 테스트 데이터<img src="images/loginimg.jpg" alt="사진 대체 텍스트 입력" contenteditable="false"><br></p>';

	return (
		<div>
			<Viewer initialValue={html} />
		</div>
	);
}
