import { Button } from '@dolbyio/comms-uikit-react';
import Text from '@src/components/Text';

import styles from './Rejoin.module.scss';

const Rejoin = ({ onRejoin }: { onRejoin: () => void }) => {
  return (
    <div className={styles.rejoin}>
      <div className={styles.rejoinContent}>
        <Text type="quoteSmall">You left the event</Text>
        <Button fw onClick={onRejoin}>
          Rejoin
        </Button>
      </div>
    </div>
  );
};

export default Rejoin;
