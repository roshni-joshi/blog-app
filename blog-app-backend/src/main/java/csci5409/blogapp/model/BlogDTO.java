package csci5409.blogapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDTO {
	private String blogId;
	private String title;
	private User author;
	private String date;
	private String content;
	private List<Comment> comments;
}
