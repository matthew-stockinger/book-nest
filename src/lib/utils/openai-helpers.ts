export async function convertFileToBase64(file: File): Promise<string | null> {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();

		reader.onloadend = () => {
			let base64String = reader.result?.toString().split(',')[1]; // Get the base64 part
			if (base64String) {
				resolve(base64String);
			} else {
				reject('Faioled to convert file to base64');
			}
		};

		reader.onerror = () => {
			reject('ERror reading file');
		};

		reader.readAsDataURL(file);
	});
}
