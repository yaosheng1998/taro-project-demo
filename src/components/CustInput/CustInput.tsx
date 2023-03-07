import { FC, memo, useRef } from 'react';
import { View } from '@tarojs/components';
import { AtInput, AtDrawer, AtSearchBar, AtCheckbox } from 'taro-ui';
import { useReactive } from 'ahooks';
import SelectList from './SelectList/SelectList';
import CLN from 'classname';
import './CustInput.scss';

interface IProps {
    className?: string;
    value: string;
    name: string;
    checkBoxOptions?: { label: string; value: string }[];
    checkBoxSelect?: string;
    placeholder?: string;
    searchList?: { label: string; value: any }[];
    onFocus?: () => void;
    onChange?: (value: any) => void;
    onSearch?: (value: any) => void;
    onListClick?: (value: any) => void;
    onCheckBoxChange?: (value: any) => void;
}

const InputSelect: FC<IProps> = props => {
    const {
        className,
        value,
        name,
        checkBoxOptions,
        checkBoxSelect,
        placeholder,
        searchList = [],
        onFocus,
        onListClick,
        onChange,
        onSearch,
        onCheckBoxChange
    } = props;
    const inputRef = useRef(null);
    const state = useReactive({ focus: false });
    return (
        <View className={CLN('cust-input__container flex', className)}>
            <View className="cust-input__icon"></View>
            <AtInput
                ref={inputRef}
                className="flex_1"
                name={name}
                value={value}
                type="text"
                editable={false}
                placeholder={placeholder}
                border={false}
                onChange={() => {}}
                onClick={() => {
                    state.focus = true;
                    onFocus && onFocus();
                }}
                onFocus={() => {
                    state.focus = true;
                    onFocus && onFocus();
                }}
            />
            <AtDrawer
                className="cust-input__drawer"
                width="100%"
                show={state.focus}
                right
                onClose={() => (state.focus = false)}
            >
                {!!checkBoxOptions && (
                    <View className="cust-input__type-select">
                        <AtCheckbox
                            options={checkBoxOptions}
                            selectedList={[checkBoxSelect]}
                            onChange={value => {
                                const oldValue = value.findIndex(item => item === checkBoxSelect);
                                if (oldValue !== -1) value.splice(oldValue, 1);
                                if (value.length === 1) onCheckBoxChange && onCheckBoxChange(value[0]);
                            }}
                        />
                    </View>
                )}
                <View className="cust-input__input-wrap flex">
                    <View className="cust-input__icon" onClick={() => (state.focus = false)}></View>
                    <AtSearchBar
                        className=" flex_1"
                        value={value}
                        placeholder={placeholder}
                        showActionButton
                        onChange={value => onChange && onChange(value)}
                        onActionClick={() => {
                            onSearch && onSearch(value);
                            state.focus = false;
                        }}
                    />
                </View>
                <SelectList
                    className="cust-input__select-list flex_1"
                    list={searchList}
                    onClick={value => onListClick && onListClick(value)}
                ></SelectList>
            </AtDrawer>
        </View>
    );
};

export default memo(InputSelect);
