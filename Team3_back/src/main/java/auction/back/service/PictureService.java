package auction.back.service;

import auction.back.domain.Picture;
import auction.back.dto.response.PictureDetailResponseDto;
import auction.back.dto.response.PictureViewResponseDto;
import auction.back.repository.PictureRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PictureService {
    private final PictureRepository pictureRepository;

    public List<PictureViewResponseDto> pictureView(Boolean photo, Boolean picture) {
        List<Picture> pictureList = pictureRepository.findAllPicture(photo, picture);

        return pictureList.stream()
                .map(PictureViewResponseDto::of)
                .collect(Collectors.toList());
    }

    public PictureDetailResponseDto pictureDetailView(Long pictureId) {
        Picture picture = pictureRepository.findById(pictureId)
                .orElseThrow(() -> new EntityNotFoundException("Picture not found with id: " + pictureId));
        return PictureDetailResponseDto.of(picture);
    }
}
