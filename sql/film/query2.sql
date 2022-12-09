-- We want to find out how many of each category of film ED CHASE has starred in.

-- So return a table with category_name and the count of the number_of_films that ED was in that category.

-- Your query should return every category even if ED has been in no films in that category

-- include ALL categories even if ED has not been in any films in that category

-- Order by the category name in ascending order.
Select CAT.NAME As category_name, Count(A.ACTOR_ID) As 'number_of_films'
From category As CAT
  Left Join film_category As FC On CAT.CATEGORY_ID = FC.CATEGORY_ID
  Left Join film As F On FC.FILM_ID = F.FILM_ID
  Left Join film_actor As FA On F.FILM_ID = FA.FILM_ID
  Left Join actor As A On FA.ACTOR_ID = A.ACTOR_ID And A.FIRST_NAME = 'ED' And
      A.LAST_NAME = 'CHASE' Group By CAT.CATEGORY_ID Order By category_name