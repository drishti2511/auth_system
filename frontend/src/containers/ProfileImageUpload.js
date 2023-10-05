// ProfileImageUpload.js
import React, { useState,useEffect } from 'react';
import { saveProfileImage } from '../actions/auth';
import { connect } from 'react-redux';

const ProfileImageUpload = ({saveProfileImage,isProfileCreated}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        const imageUrl = URL.createObjectURL(selectedImage);
        saveProfileImage(imageUrl);
        // onImageSelect(file); // Pass the selected image to the parent component
        
    };

    useEffect(() => {
        console.log('selectedImage:', selectedImage);
    }, [selectedImage]);

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                name="profileImage"
                onChange={handleImageChange}
            />
            {selectedImage && (
                <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    width="100"
                />
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    isProfileCreated: state.auth.isProfileCreated
});

export default connect(mapStateToProps,{saveProfileImage})(ProfileImageUpload);
