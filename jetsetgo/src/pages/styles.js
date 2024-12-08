import styled from 'styled-components';

export const Container = styled.div`
  background-color: #243b55;
  color: #ffffff;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background-color: #1b2735;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const TextBox = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #302f2f;
  color: white;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #302f2f;
  color: white;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const UploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1b2735;
  border: 2px dashed #ccc;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background: #333b47;
  }
`;

export const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  margin-right: 10px;
  cursor: pointer;
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

export const Tag = styled.button`
  background-color: #b66f0a;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  margin: 5px;
  cursor: pointer;
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;
