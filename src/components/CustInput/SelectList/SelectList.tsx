import { FC, useRef, memo } from 'react';
import { View } from '@tarojs/components';
import { useClickAway } from 'ahooks';
import CLN from 'classname';
import './SelectList.scss';

interface IProps {
    className?: string;
    list: { label: string; value: string | number }[];
    onClick?: (value: string | number) => void;
    onCancel?: () => void;
}

const SelectList: FC<IProps> = props => {
    const { className, list, onClick, onCancel } = props;
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(() => {
        onCancel && onCancel();
    }, ref);
    return (
        <View className={CLN('select-list__container flex_column', className)} ref={ref}>
            {list.length ? (
                list.map((item, index) => (
                    <View className="select-list__list-item" key={index} onClick={() => onClick && onClick(item.value)}>
                        {item.label}
                    </View>
                ))
            ) : (
                <View className="select-list__no-result">无结果</View>
            )}
        </View>
    );
};

export default memo(SelectList);
