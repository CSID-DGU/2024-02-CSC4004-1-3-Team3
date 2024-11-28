package auction.back.service;

import auction.back.domain.Picture;
import auction.back.domain.PictureImg;
import auction.back.domain.User;
import auction.back.dto.request.PictureRegistrationRequestDto;
import auction.back.dto.response.PictureDetailResponseDto;
import auction.back.dto.response.PictureViewResponseDto;
import auction.back.repository.LikeRepository;
import auction.back.repository.PictureImgRepository;
import auction.back.repository.PictureRepository;
import auction.back.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PictureService {
    private final PictureRepository pictureRepository;
    private final PictureImgRepository pictureImgRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final S3Service s3Service;

    public List<PictureViewResponseDto> pictureView(Boolean photo, Boolean picture, Long userId) {
        List<Picture> pictureList = pictureRepository.findAllPicture(photo, picture);

        return pictureList.stream()
                .map(pic -> {
                    boolean isLiked = false;
                    if (userId != null) {
                        isLiked = likeRepository.existsByPictureIdAndUserId(pic.getId(), userId);
                    }
                    return PictureViewResponseDto.of(pic, isLiked);
                })
                .collect(Collectors.toList());
    }

    public PictureDetailResponseDto pictureDetailView(Long pictureId) {
        Picture picture = pictureRepository.findByIdWithDetails(pictureId)
                .orElseThrow(() -> new EntityNotFoundException("Picture not found with id: " + pictureId));

        int likeCount = pictureRepository.countLikesByPictureId(pictureId);

        return PictureDetailResponseDto.of(picture, likeCount);
    }

    public boolean registration(PictureRegistrationRequestDto request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!user.isAuthor()) {
            throw new IllegalArgumentException("User is not an author");
        }

        Picture picture = Picture.builder()
                .name(request.pictureName())
                .description(request.description())
                .ingredient(request.ingredient())
                .sizeWidth(request.sizeWidth())
                .sizeHeight(request.sizeHeight())
                .makeTime(request.makeTime())
                .pictureCondition(request.pictureCondition())
                .isPhoto(request.isPhoto())
                .user(user)
                .pictureImgList(new ArrayList<>())
                .build();

        Picture savedPicture = pictureRepository.save(picture);

        for (MultipartFile image : request.images()) {
            String imageUrl = s3Service.uploadImage(image);
            PictureImg pictureImg = PictureImg.builder()
                    .url(imageUrl)
                    .picture(savedPicture)
                    .build();
            pictureImgRepository.save(pictureImg);  // 각 PictureImg 개별 저장
        }

        return true;
    }

    private List<String> uploadImagesToS3(List<MultipartFile> images) {
        List<String> uploadedUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            String url = s3Service.uploadImage(image);
            uploadedUrls.add(url);
        }
        return uploadedUrls;
    }
}
