﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GlodnyStudent.Models.Domain
{
    public class MenuItem
    {
        public long Id { get; set; }

        [Required]
        [RegularExpression(@"^[\p{Lu}\p{Ll} ]*$", ErrorMessage = "Name is invalid")]
        public string Name { get; set; }

        [Column(TypeName = "decimal(13,2)")]
        public decimal Price { get; set; }
        
        public long RestaurantId { get; set; }

        public virtual Restaurant Restaurant { get; set; }
    }
}
