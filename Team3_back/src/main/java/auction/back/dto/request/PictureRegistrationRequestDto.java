package auction.back.dto.request;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
public record PictureRegistrationRequestDto(
        Long userId,
        String pictureName,
        String description,
        String ingredient,
        String sizeWidth,
        String sizeHeight,
        String makeTime,
        String pictureCondition,
        Boolean isPhoto,
        List<MultipartFile> images
) {}
