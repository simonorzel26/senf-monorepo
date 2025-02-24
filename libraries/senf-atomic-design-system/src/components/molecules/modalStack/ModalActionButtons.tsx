import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";

const ModalActionButtons = ({ ...options }) => {
	const { cancelText, submitText, onClose, onSubmit, submitDisabled, submitLoading, size, modalPayload } = options || {}
	if (!cancelText && !submitText) return null;

	return <Box
		width="100%"
		gap="8px"
		padding="20px"
		flexDirection={["sm", "s"].includes(size) && "column" || undefined}
	>
		{cancelText &&
			<Button
				variant="secondary"
				width="max"
				onClick={onClose}
				text={cancelText}
			/>
		}
		{submitText &&
			<Button
				variant="primary"
				width="max"
				onClick={() => onSubmit(modalPayload) || onClose()}
				disabled={!!submitDisabled}
				text={submitText}
				loading={submitLoading}
			/>
		}
	</Box>
}


export default ModalActionButtons