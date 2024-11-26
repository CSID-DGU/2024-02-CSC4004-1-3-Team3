package auction.back.dto.request;

import lombok.Builder;

@Builder
public record UserLoginRequestDto(
        String loginId,
        String loginPassword) {

    public UserLoginRequestDto toEntity() {
        return UserLoginRequestDto.builder()
                .loginId(this.loginId)
                .loginPassword(this.loginPassword)
                .build();
    }

}
