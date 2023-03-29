/* eslint-disable react-hooks/exhaustive-deps */
import { notification } from "antd";
import { forwardRef, useEffect, useImperativeHandle } from "react"
import useNotificationStore from "../../store/use-notification-store";


const Notification = forwardRef((props, ref) => {

    const [api, contextHolder] = notification.useNotification();
    const notiffStore = useNotificationStore();

    useEffect(() => {
        notiffStore.setShowSuccessNotiff(showSuccessNotification)
        notiffStore.setShowErrorNotiff(showErrorNotification)
    }, [])


    const showSuccessNotification = (message: string) => {
        console.log('in')
        api.success({
            message: `Success`,
            description: message,
            duration: 50000
        })
    };

    const showErrorNotification = (message: string) => {
        api.error({
            message: `Error`,
            description: message,
        })
    };

    useImperativeHandle(ref, () => ({
        showSuccessNotification,
        showErrorNotification
    }))

    return <div>
        {contextHolder}
    </div>
})

export default Notification;