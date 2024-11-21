package auction.back.service;

import auction.back.domain.Picture;
import auction.back.domain.User;
import auction.back.dto.response.AuthorDetailResponseDto;
import auction.back.dto.response.AuthorViewResponseDto;
import auction.back.repository.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    public List<AuthorViewResponseDto> mainView(Boolean sortByFollow) {
        List<User> authors;
        if (Boolean.TRUE.equals(sortByFollow)) {
            authors = authorRepository.findAllAuthorsOrderByFollowCountAndName();
        } else {
            authors = authorRepository.findAllAuthorsOrderByName();
        }

        return authors.stream()
                .map(AuthorViewResponseDto::of)
                .collect(Collectors.toList());
    }

    public AuthorDetailResponseDto authorDetailView(Long userId) {
        User author = authorRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Author not found with id: " + userId));

        if (!author.isAuthor()) {
            throw new IllegalArgumentException("User with id: " + userId + " is not an author");
        }

        int followersCount = authorRepository.countFollowersByAuthorId(userId);
        List<Picture> recentPictures = authorRepository.findRecentPicturesByAuthorId(userId, PageRequest.of(0, 5));

        return AuthorDetailResponseDto.of(author, followersCount, recentPictures);
    }
}
