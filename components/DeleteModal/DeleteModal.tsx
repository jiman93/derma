import { Box, Button, Group, Text, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { ContextModalProps } from '@mantine/modals';
import { useAppDispatch } from '../../utils/hooks';

const DeleteModal = ({
  context,
  id: modalId,
  innerProps,
}: ContextModalProps<{ modalBody: string; itemId: string }>) => {
  const dispatch = useAppDispatch();
  const [deleteReason, setDeleteReason] = useInputState('Old record');

  return (
    <>
      <Box>
        <Text size="sm" mb={5}>
          {innerProps.modalBody}
        </Text>
        <TextInput
          placeholder="Enter reason"
          data-autofocus
          required
          value={deleteReason}
          onChange={setDeleteReason}
        />
      </Box>

      <Group position="right">
        <Button color="gray" variant="light" mt="md" onClick={() => context.closeModal(modalId)}>
          {` No don't delete it`}
        </Button>
        <Button
          color="red"
          mt="md"
          onClick={async () => {
            context.closeModal(modalId);
          }}
        >
          Delete
        </Button>
      </Group>
    </>
  );
};

export default DeleteModal;
