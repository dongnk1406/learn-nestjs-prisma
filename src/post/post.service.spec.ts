import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { CreatePostDto, UpdatePostDto, TPostFilter } from './dto/post.dto';
import { Post } from '@prisma/client';

describe('PostService', () => {
  let service: PostService;

  const mockPost = {
    id: 1,
    title: 'Test Post',
    summary: 'Test Summary',
    content: 'Test Content',
    status: 1,
    ownerId: 1,
  } as Post;

  const postRepositoryMock = {
    createPost: jest.fn(),
    updatePost: jest.fn(),
    getPost: jest.fn(),
    getPostsList: jest.fn(),
    getPostsListCount: jest.fn(),
    deletePost: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: postRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post successfully', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        summary: 'Test Summary',
        content: 'Test Content',
        status: 1,
        ownerId: 1,
        categoryIds: [1, 2],
      };

      postRepositoryMock.createPost.mockResolvedValue(mockPost);

      const result = await service.createPost(createPostDto);

      expect(postRepositoryMock.createPost).toHaveBeenCalledWith(createPostDto);
      expect(result).toEqual(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post successfully', async () => {
      const postId = 1;
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Post',
        summary: 'Updated Summary',
        content: 'Updated Content',
        status: 1,
        ownerId: 1,
        categoryIds: [1, 3],
      };

      const updatedPost = { ...mockPost, ...updatePostDto };
      postRepositoryMock.updatePost.mockResolvedValue(updatedPost);

      const result = await service.updatePost(postId, updatePostDto);

      expect(postRepositoryMock.updatePost).toHaveBeenCalledWith(
        postId,
        updatePostDto,
      );
      expect(result).toEqual(updatedPost);
    });
  });

  describe('getPost', () => {
    it('should return a post when found', async () => {
      const postId = 1;
      postRepositoryMock.getPost.mockResolvedValue(mockPost);

      const result = await service.getPost(postId);

      expect(postRepositoryMock.getPost).toHaveBeenCalledWith(postId);
      expect(result).toEqual(mockPost);
    });

    it('should throw HttpException when post is not found', async () => {
      const postId = 999;
      postRepositoryMock.getPost.mockResolvedValue(null);

      await expect(service.getPost(postId)).rejects.toThrow(HttpException);
      await expect(service.getPost(postId)).rejects.toThrow('Post not found');

      expect(postRepositoryMock.getPost).toHaveBeenCalledWith(postId);
    });

    it('should throw HttpException with correct status code', async () => {
      const postId = 999;
      postRepositoryMock.getPost.mockResolvedValue(null);

      try {
        await service.getPost(postId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        const httpError = error as HttpException;
        expect(httpError.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(httpError.getResponse()).toEqual({ message: 'Post not found' });
      }
    });
  });

  describe('getPostsList', () => {
    it('should return paginated posts list with default values', async () => {
      const filter: TPostFilter = {};
      const mockPosts = [mockPost];
      const mockTotal = 1;

      postRepositoryMock.getPostsList.mockResolvedValue(mockPosts);
      postRepositoryMock.getPostsListCount.mockResolvedValue(mockTotal);

      const result = await service.getPostsList(filter);

      const expectedPayload = {
        itemsPerPage: 10,
        search: '',
        skip: 0,
        page: 1,
      };

      expect(postRepositoryMock.getPostsList).toHaveBeenCalledWith(
        expectedPayload,
      );
      expect(postRepositoryMock.getPostsListCount).toHaveBeenCalledWith(
        expectedPayload,
      );
      expect(result).toEqual({
        data: mockPosts,
        total: mockTotal,
        itemsPerPage: 10,
        currentPage: 1,
      });
    });

    it('should return paginated posts list with custom values', async () => {
      const filter: TPostFilter = {
        page: 2,
        itemsPerPage: 5,
        search: 'test search',
      };
      const mockPosts = [mockPost];
      const mockTotal = 10;

      postRepositoryMock.getPostsList.mockResolvedValue(mockPosts);
      postRepositoryMock.getPostsListCount.mockResolvedValue(mockTotal);

      const result = await service.getPostsList(filter);

      const expectedPayload = {
        itemsPerPage: 5,
        search: 'test search',
        skip: 5, // (page 2 - 1) * itemsPerPage 5 = 5
        page: 2,
      };

      expect(postRepositoryMock.getPostsList).toHaveBeenCalledWith(
        expectedPayload,
      );
      expect(postRepositoryMock.getPostsListCount).toHaveBeenCalledWith(
        expectedPayload,
      );
      expect(result).toEqual({
        data: mockPosts,
        total: mockTotal,
        itemsPerPage: 5,
        currentPage: 2,
      });
    });

    it('should calculate skip correctly for first page', async () => {
      const filter: TPostFilter = {
        page: 1,
        itemsPerPage: 10,
      };

      postRepositoryMock.getPostsList.mockResolvedValue([mockPost]);
      postRepositoryMock.getPostsListCount.mockResolvedValue(1);

      await service.getPostsList(filter);

      const expectedPayload = {
        itemsPerPage: 10,
        search: '',
        skip: 0, // page 1 should have skip = 0
        page: 1,
      };

      expect(postRepositoryMock.getPostsList).toHaveBeenCalledWith(
        expectedPayload,
      );
    });
  });

  describe('deletePost', () => {
    it('should call repository deletePost method', () => {
      const postId = 1;
      postRepositoryMock.deletePost.mockReturnValue(undefined);

      service.deletePost(postId);

      expect(postRepositoryMock.deletePost).toHaveBeenCalledWith(postId);
    });
  });
});
