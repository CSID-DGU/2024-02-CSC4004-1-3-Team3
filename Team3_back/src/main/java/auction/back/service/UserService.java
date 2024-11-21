package auction.back.service;

import auction.back.domain.User;
import auction.back.dto.request.UserLoginRequestDto;
import auction.back.dto.request.UserSignUpRequestDto;
import auction.back.dto.response.MypageResponseDto;
import auction.back.dto.response.UserLoginResponseDto;
import auction.back.exception.ApiException;
import auction.back.exception.ErrorDefine;
import auction.back.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserLoginResponseDto login(UserLoginRequestDto userLoginRequestDto){
        User user = userRepository.findByLoginId(userLoginRequestDto.loginId())
                .orElseThrow(() -> new ApiException(ErrorDefine.USER_NOT_FOUND));

        return UserLoginResponseDto.of(user);
    }

    public Boolean signup(UserSignUpRequestDto userSignUpRequestDto){
        if (userRepository.existsByLoginId(userSignUpRequestDto.loginId())) {
            throw new ApiException(ErrorDefine.DUPLICATE_USER_ID);
        }

        User user = userSignUpRequestDto.toEntity();
        userRepository.save(user);

        return true;
    }

    public MypageResponseDto myView(Long userId) {
        User user = userRepository.findByIdWithDetails(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        return MypageResponseDto.of(user);
    }
}
