package reddist.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HitBase {
    private String x;
    private String y;
    private String r;
    private String result;
}
