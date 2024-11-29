package auction.back.service;

import auction.back.domain.*;
import auction.back.dto.request.AuctionRegistRequestDto;
import auction.back.dto.request.PictureRegistrationRequestDto;
import auction.back.dto.response.PictureDetailResponseDto;
import auction.back.dto.response.PictureViewResponseDto;
import auction.back.dto.response.RegistAuctionViewResponseDto;
import auction.back.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PictureService {
    private final PictureRepository pictureRepository;
    private final PictureImgRepository pictureImgRepository;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final MappingRepository mappingRepository;
    private final S3Service s3Service;
    private static final int MIN_LIKES_FOR_AUCTION = 1;

    public List<RegistAuctionViewResponseDto> auctionRegistView(Long userId) {
        List<Picture> eligiblePictures = pictureRepository
                .findPicturesForAuctionRegistration(userId, MIN_LIKES_FOR_AUCTION);

        return eligiblePictures.stream()
                .map(picture -> {
                    int likeCount = pictureRepository.countLikesByPictureId(picture.getId());
                    return RegistAuctionViewResponseDto.of(picture, likeCount);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public Boolean auctionRegist(AuctionRegistRequestDto auctionRegistRequestDto) {
        User user = userRepository.findById(auctionRegistRequestDto.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Picture picture = pictureRepository.findById(auctionRegistRequestDto.pictureId())
                .orElseThrow(() -> new EntityNotFoundException("Picture not found"));

        if (!picture.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("This picture doesn't belong to the user");
        }

        LocalDateTime now = LocalDateTime.now();

        Auction auction = Auction.builder()
                .startPrice(auctionRegistRequestDto.startPrice())
                .ingPrice(auctionRegistRequestDto.startPrice())
                .endPrice(auctionRegistRequestDto.startPrice())
                .startAt(now)
                .finishAt(now.plusWeeks(1))
                .picture(picture)
                .build();

        Auction savedAuction = auctionRepository.save(auction);

        // 경매 생성자를 Mapping 테이블에 추가
        Mapping mapping = Mapping.builder()
                .auction(savedAuction)
                .user(user)
                .build();

        mappingRepository.save(mapping);

        return true;
    }

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
