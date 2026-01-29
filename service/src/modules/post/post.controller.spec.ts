import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentService } from '../comment/comment.service';
import {
  CreatePostDto,
  UpdatePostDto,
  TPostFilter,
  TPostPaginationResponse,
} from './dto/post.dto';
import { Post } from '@prisma/client';

describe('PostController', () => {
  let controller: PostController;

  const mockPost = {
    id: 1,
    title: 'Test Post',
    summary: 'Test Summary',
    content: 'Test Content',
    status: 1,
    ownerId: 1,
  } as Post;

  const postServiceMock = {
    createPost: jest.fn(),
    getPostsList: jest.fn(),
    getPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  };

  const commentServiceMock = {
    createComment: jest.fn(),
    getCommentsByPostId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: postServiceMock,
        },
        {
          provide: CommentService,
          useValue: commentServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        summary: 'Test Summary',
        content: 'Test Content',
        status: 1,
        ownerId: 1,
        categoryIds: [1, 2],
      };

      postServiceMock.createPost.mockResolvedValue(mockPost);

      const result = await controller.createUser(createPostDto);

      expect(postServiceMock.createPost).toHaveBeenCalledWith(createPostDto);
      expect(result).toEqual(mockPost);
    });
  });

  describe('getPostsList', () => {
    it('should return posts list with pagination', async () => {
      const filter: TPostFilter = {
        page: 1,
        itemsPerPage: 10,
        search: 'test',
      };

      const mockPaginationResponse: TPostPaginationResponse = {
        data: [mockPost],
        total: 1,
        currentPage: 1,
        itemsPerPage: 10,
      };

      postServiceMock.getPostsList.mockResolvedValue(mockPaginationResponse);

      const result = await controller.getPostsList(filter);

      expect(postServiceMock.getPostsList).toHaveBeenCalledWith(filter);
      expect(result).toEqual(mockPaginationResponse);
    });
  });

  describe('getDetail', () => {
    it('should return a single post by id', async () => {
      const postId = 1;
      postServiceMock.getPost.mockResolvedValue(mockPost);

      const result = await controller.getDetail(postId);

      expect(postServiceMock.getPost).toHaveBeenCalledWith(postId);
      expect(result).toEqual(mockPost);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
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
      postServiceMock.updatePost.mockResolvedValue(updatedPost);

      const result = await controller.update(postId, updatePostDto);

      expect(postServiceMock.updatePost).toHaveBeenCalledWith(
        postId,
        updatePostDto,
      );
      expect(result).toEqual(updatedPost);
    });
  });

  describe('delete', () => {
    it('should call delete post service method', () => {
      const postId = 1;
      postServiceMock.deletePost.mockReturnValue(undefined);

      controller.delete(postId);

      expect(postServiceMock.deletePost).toHaveBeenCalledWith(postId);
    });
  });
});
