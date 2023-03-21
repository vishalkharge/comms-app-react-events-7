import {
  Button,
  Icon,
  IconButton,
  IconButtonProps,
  Modal,
  Space,
  Text,
  Tooltip,
  useTheme,
} from '@dolbyio/comms-uikit-react';
import { SideDrawerContentTypes } from '@src/context/SideDrawerContext';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './SideDrawerBottomBar.module.scss';

const SideDrawerBottomBarButton = (
  props: IconButtonProps & {
    tooltipText: string;
    testID?: string;
    isSelected: boolean;
  },
) => {
  const { tooltipText, isSelected, ...rest } = props;
  return (
    <Tooltip text={tooltipText}>
      <Space className={styles.container}>
        <Icon name="circle" size="xxxs" color={isSelected ? 'primary' : 'transparent'} />
        <IconButton
          variant="circle"
          size="s"
          iconSize="m"
          iconColor={isSelected ? 'white' : 'grey.300'}
          backgroundColor="transparent"
          {...rest}
        />
      </Space>
    </Tooltip>
  );
};

const SideDrawerBottomBar = ({
  onParticipantsClick,
  onSettingsClick,
  onExitConfirm,
  contentType,
}: {
  onParticipantsClick?: () => void;
  onSettingsClick?: () => void;
  onExitConfirm?: () => void;
  contentType: SideDrawerContentTypes | null;
}) => {
  const { getColor } = useTheme();
  const intl = useIntl();
  const [showLeaveCheckModal, setShowLeaveCheckModal] = useState(false);

  return (
    <div className={styles.sideBar}>
      {onParticipantsClick && (
        <SideDrawerBottomBarButton
          badgeColor="grey.400"
          tooltipText={intl.formatMessage({ id: 'participantsLabel' })}
          icon="participants"
          isSelected={contentType === SideDrawerContentTypes.PARTICIPANTS}
          onClick={onParticipantsClick}
        />
      )}
      {onSettingsClick && (
        <SideDrawerBottomBarButton
          tooltipText={intl.formatMessage({ id: 'settings' })}
          icon="settings"
          isSelected={contentType === SideDrawerContentTypes.DEVICE_SETUP}
          onClick={onSettingsClick}
        />
      )}
      {onExitConfirm && (
        <div className={styles.exit}>
          <SideDrawerBottomBarButton
            tooltipText={intl.formatMessage({ id: 'exit' })}
            icon="exit"
            isSelected={false}
            backgroundColor={getColor('infoError')}
            iconColor={getColor('white')}
            size="xs"
            onClick={() => setShowLeaveCheckModal(true)}
          />
        </div>
      )}
      <Modal isVisible={showLeaveCheckModal} close={() => setShowLeaveCheckModal(false)} closeButton overlayClickClose>
        <Space m="l" className={styles.modal}>
          <Text type="h6" align="center">
            Are you sure you want to leave the event?
          </Text>
          <Button size="s" fw onClick={onExitConfirm}>
            leave event
          </Button>
          <Button variant="secondary" size="s" fw onClick={() => setShowLeaveCheckModal(false)}>
            cancel
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default SideDrawerBottomBar;
