import { notification } from 'antd';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import useNotificationStore from '../../store/use-notification-store';


// eslint-disable-next-line react/display-name
const Notification = forwardRef((_props, ref) => {

    const [api, contextHolder] = notification.useNotification();
    const notiffStore = useNotificationStore();

    useEffect(() => {
        notiffStore.setShowSuccessNotiff(showSuccessNotification);
        notiffStore.setShowErrorNotiff(showErrorNotification);
    }, []);


    const showSuccessNotification = (message: string) => {
        api.success({
            message: 'Success',
            description: message,
            duration: 50000
        });
    };

    const showErrorNotification = (message: string) => {
        api.error({
            message: 'Error',
            description: message,
        });
    };

    useImperativeHandle(ref, () => ({
        showSuccessNotification,
        showErrorNotification
    }));

    return <div>
        {contextHolder}
    </div>;
});

export default Notification;