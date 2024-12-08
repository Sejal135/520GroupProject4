import React, { useState } from 'react';
import '../components/CReview.css';
import {
  Container,
  Card,
  Title,
  FormGroup,
  Label,
  TextBox,
  TextArea,
  ImageUploadContainer,
  UploadButton,
  ImagePreview,
  Button,
  Tag,
  Footer,
} from './styles';

const CreateReview = () => {
  const [image, setImage] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [tags, setTags] = useState([]);
  const [review, setReview] = useState({ title: '', location: '', content: '' });

  const handleTagToggle = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Card>
        <Title>Leave a Review</Title>
        <ImageUploadContainer>
          <UploadButton>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            {image ? (
              <ImagePreview src={image} alt="Uploaded" />
            ) : (
              <span>+</span>
            )}
          </UploadButton>
        </ImageUploadContainer>
        <FormGroup>
          <Label>Review Title</Label>
          <TextBox
            type="text"
            maxLength={50}
            placeholder="Enter title..."
            name="title"
            value={review.title}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Location</Label>
          <TextBox
            type="text"
            maxLength={50}
            placeholder="Enter location..."
            name="location"
            value={review.location}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Enter Review</Label>
          <TextArea
            rows={5}
            maxLength={250}
            placeholder="Write your review..."
            name="content"
            value={review.content}
            onChange={handleInputChange}
          />
        </FormGroup>
        <div>
          <Button
            color="#1d707f"
            disabled={recommend === 'not'}
            onClick={() => setRecommend('yes')}
          >
            Recommend
          </Button>
          <Button
            color="#1d707f"
            disabled={recommend === 'yes'}
            onClick={() => setRecommend('not')}
          >
            Not Recommended
          </Button>
        </div>
        <div>
          {['Adventure', 'Night Life', 'Group Travel', 'Scenic Views', 'Nature'].map(
            (tag) => (
              <Tag
                key={tag}
                onClick={() => handleTagToggle(tag)}
                style={{
                  backgroundColor: tags.includes(tag) ? '#FF922B' : '#b66f0a',
                }}
              >
                {tag}
              </Tag>
            )
          )}
        </div>
        <Footer>Created December 6th, 2024</Footer>
      </Card>
    </Container>
  );
};

export default CreateReview;

