console.log = __electronLog.info
console.error = __electronLog.error

window.addEventListener('DOMContentLoaded', () => {
	__electronLog.log('Hello from renderer')	

	const result = rustLib.fib(8);
	const text = rustLib.read_file("/home/andrii/repo/electron-napi-rs/input.txt")

	const content = document.querySelector('#rust-content');
	const textFile = document.querySelector('#text');

	content.innerHTML = `This number came from Rust! <strong>${result}</strong>`;
	textFile.innerHTML = `Content from File system: <strong>${text}</strong>`;
});
