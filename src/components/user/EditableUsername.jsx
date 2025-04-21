import { Editable, EditableInput, EditablePreview, ButtonGroup, IconButton, Input, Flex } from '@chakra-ui/react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'; // ใช้ไอคอนจาก react-icons
import { useEditableControls } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changeUsername } from '../../store/slice/authSlice';
import { useState } from 'react';

export const EditableUsername = ({ username }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [currentUsername, setCurrentUsername] = useState(username);
    const [editingValue, setEditingValue] = useState(username);

    // Custom controls for editing
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton icon={<FaCheck />} {...getSubmitButtonProps()} />
                <IconButton icon={<FaTimes />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <IconButton size="xs" justifyContent="center"  rounded={"full"}  icon={ <FaEdit className='ml-0.5'   />} {...getEditButtonProps()} />
        );
    }

    const handleChangeUsername = (newUserName) => {
        // ถ้าผู้ใช้ยังไม่ได้ตั้งชื่อผู้ใช้ (ชื่อเป็นค่าว่าง) หรือชื่อใหม่เป็นค่าว่าง
        if (!newUserName || newUserName.trim() === '') {
            toast.warn("กรุณากรอกชื่อผู้ใช้ใหม่");
            return;
        }

        // ถ้าผู้ใช้มีการตั้งชื่อแล้วให้ทำการเปลี่ยนชื่อ
        dispatch(changeUsername({ newUserName: newUserName }))
            .unwrap()
            .then((data) => {
                // ถ้าการเปลี่ยนชื่อสำเร็จ
                console.log(data);
                toast.success(data.message);
                setCurrentUsername(newUserName);  // อัพเดตชื่อใหม่ใน state
                setEditingValue(newUserName);    // อัพเดตค่าที่กำลังแก้ไขด้วย
                // setError(false); // รีเซ็ตสถานะข้อผิดพลาด

            })
            .catch((error) => {
                // ถ้าการเปลี่ยนชื่อล้มเหลว
                toast.error(`${error.message || error}`);
                setEditingValue(currentUsername); // รีเซ็ตค่าที่กำลังแก้ไขกลับเป็นค่าเดิม
                // setError(true); // กำหนดสถานะข้อผิดพลาด

            });
    };


    // เพิ่ม handler สำหรับการยกเลิกการแก้ไข
    const handleCancel = () => {
        setEditingValue(currentUsername); // รีเซ็ตค่าที่กำลังแก้ไขกลับเป็นค่าเดิม
    };

    // เพิ่ม handler สำหรับการเปลี่ยนแปลงค่า
    const handleChange = (nextValue) => {
        setEditingValue(nextValue);
    };

    return (
        <Editable
            textAlign="left"
            value={editingValue}           // ใช้ value แทน defaultValue
            fontSize="md"
            color={'gray.500'}
            isPreviewFocusable={false}
            onChange={handleChange}        // เพิ่ม onChange handler
            onCancel={handleCancel}        // เพิ่ม onCancel handler
            onSubmit={(newUsername) => handleChangeUsername(newUsername)} // เมื่อกด submit ให้เรียก handleChangeUsername
        >
            {/* Editable context is now correctly wrapped */}
            <div className="flex items-center space-x-4">
                <EditablePreview />
                <Input as={EditableInput} />

                {/* Place EditableControls inside the Editable component */}
                <EditableControls />
            </div>
        </Editable>
    );
};
